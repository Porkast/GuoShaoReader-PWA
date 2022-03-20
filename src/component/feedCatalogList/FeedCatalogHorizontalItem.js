import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {getTextFromDescription} from "../../utils/common";

export default function FeedCatalogHorizontalItem(props) {
    const classes = useStyles();
    const itemData = props.data
    const inputDate = itemData.InputDate.slice(0, 10)
    const date = (itemData.date === null || itemData.date === undefined || itemData.date === "" ? inputDate : itemData.date)
    const history = useHistory()

    const onFeedLinkClick = () => {
        history.push({
            pathname: '/feed/item/' + itemData.Id
        })
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.media} onClick={onFeedLinkClick}>
                <Typography gutterBottom variant="subtitle2">{itemData.Title}</Typography>
                {itemData.Thumbnail === ''
                    ?
                    <Typography className={classes.dateText} variant="subtitle1"
                                color="textSecondary">{getTextFromDescription(itemData.Description)}</Typography>
                    :
                    <CardMedia
                        className={classes.channelDescription}
                        component="img"
                        image={itemData.Thumbnail}
                        alt=""
                    />}
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