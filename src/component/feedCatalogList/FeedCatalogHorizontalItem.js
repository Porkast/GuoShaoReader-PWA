import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import parse from "html-react-parser";

export default function FeedCatalogHorizontalItem(props) {
    const classes = useStyles();
    const itemData = props.data
    const date = itemData.InputDate.slice(0, 10)

    const onFeedLinkClick = () => {
        window.open(itemData.Link)
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.media} onClick={onFeedLinkClick}>
                <Typography gutterBottom variant="subtitle2">{itemData.Title}</Typography>
                <div className={classes.channelDescription}>
                    {parse(itemData.ChannelDesc)}
                </div>
                <Typography className={classes.dateText} variant="subtitle2"
                            color="textSecondary">{date}</Typography>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles({
    root: {
        width: 300,
        maxHeight: 500,
        marginLeft: '10px',
        marginBottom: '15px',
        marginTop: '5px',
        borderBottom: "none"
    },
    media: {
        maxWidth: 345,
    },
    dateText: {
        marginTop: "10px"
    },
    channelDescription: {
        maxHeight: "300px",
        overflow: "scroll"
    }
});