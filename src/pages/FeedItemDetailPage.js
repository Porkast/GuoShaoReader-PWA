import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, useParams} from "react-router-dom";
import {getUserLoginInfo} from "../service/UserService";
import {
    getFeedItemInfoById, markFeedItemByUserId,
} from "../utils/http_util";
import {AuthContext} from "./Home";
import parse from "html-react-parser";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader, IconButton,
    Typography
} from "@material-ui/core";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import Toast from "../component/Toast";
import copy from "copy-to-clipboard";

const FeedItemDetailPage = () => {

    const classes = useStyles();

    const {itemId} = useParams()
    const authContext = useContext(AuthContext);
    const [author, setAuthor] = React.useState("")
    const [date, setDate] = React.useState("")
    const [itemHtml, setItemHtml] = React.useState("")
    const [isMarked, setIsMarked] = React.useState(false)
    const [itemData, setItemData] = React.useState({})
    const userInfo = JSON.parse(getUserLoginInfo());

    useEffect(() => {
        getItemInfo()
    }, [])

    const getItemInfo = () => {
        let uid = "";
        if (userInfo !== null) {
            uid = userInfo["uid"]
        }
        let params = {
            UserId: uid,
            itemId: itemId,
        }

        getFeedItemInfoById(params).then(res => {
            if (res.status === 200) {
                let itemInfoData = res.data.data
                setItemData(itemInfoData)
                if (itemInfoData.Author !== "") {
                    setAuthor("作者:" + itemInfoData.Author)
                }
                if (itemInfoData.Marked === 1) {
                    setIsMarked(true)
                }

                setDate(itemInfoData.InputDate.slice(0, 10))
                setItemHtml(itemInfoData.ChannelDesc)
                console.log(itemInfoData)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const toOriginalPage = () => {
        window.open(itemData.Link)
    }

    const handlerFavoriteClick = () => {
        let params = {
            UserId: userInfo["uid"],
            ItemId: itemData.Id,
        };

        markFeedItemByUserId(params).then(res => {
            if (res.status === 200) {
                if (isMarked) {
                    setIsMarked(false)
                    Toast.show("取消收藏", "info")
                } else {
                    setIsMarked(true)
                    Toast.show("已收藏", "info")
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const handlerShareClick = () => {
        copy(itemData.Link)
        Toast.show("链接已复制到剪贴板", "info")
    }

    return (
        <div style={{overflow: 'scroll', height: authContext.GetCPageHeight()}}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardHeader
                        title={itemData.Title}
                        subheader={itemData.ChannelTitle}
                        className={classes.title}
                    />
                    <CardContent>
                        <Typography className={classes.dateText} variant="subtitle2"
                                    color="textSecondary">{date}&nbsp;&nbsp;{author}</Typography>
                        <div className={classes.channelDescription}>
                            {parse(itemHtml)}
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button color={"primary"} size="small" onClick={toOriginalPage}>查看原文</Button>
                    </CardActions>
                    <IconButton aria-label="favorite" onClick={handlerFavoriteClick}>
                        {isMarked ? <FavoriteBorderOutlinedIcon color={"primary"}/> : (
                            <FavoriteBorderOutlinedIcon/>
                        )}
                    </IconButton>


                    <IconButton aria-label="share" onClick={handlerShareClick}>
                        <ShareOutlinedIcon/>
                    </IconButton>
                </CardActionArea>
            </Card>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '94%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '8px'
    },
    title: {},
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: "transparent",
    },
    dateText: {
        marginTop: "10px",
        marginBottom: "20px"
    },
    channelDescription: {
        overflow: "scroll"
    }

}));

export default FeedItemDetailPage