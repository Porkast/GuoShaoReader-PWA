import React, { useEffect } from "react";
import { List, ListItem } from "@mui/material"
import CommonFeedListItem from "./CommonFeedListItem";
import Pagination from "@mui/material/Pagination"
import Box from "@mui/material/Box"
import ListLoadingPlaceholder from "./ListPlacHolder";
import EmptyView from "./EmptyView";


function CommonFeedList(props) {

  const fetchData = props.fetchData
  const [feedList, setFeedList] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1)
  const [subFeedListEmpty, setSubFeedListEmpty] = React.useState(false)

  const handlePaginationChange = (_event, value) => {
    setPage(value)
    setLoading(true)
    fetchData(false, value, (resp) => {
      if (resp === undefined || resp === null || resp === []) {
        if (feedList.length === 0) {
          setSubFeedListEmpty(true)
        }
        setLoading(false)
        return
      }
      setLoading(false)
      setFeedList(resp)
    })
  }

  useEffect(() => {
    setLoading(true)
    fetchData(true, page, (resp) => {
      if (resp === undefined || resp === null || resp === []) {
        if (feedList.length === 0) {
          setSubFeedListEmpty(true)
        }
        setLoading(false)
        return
      }
      setFeedList(resp)
    })
    setLoading(false)
  }, [])



  return (
    <div className="w-full">
      {subFeedListEmpty ? (<EmptyView />) :
        <div>
          <Box className="flex justify-center">
            {loading ? (<ListLoadingPlaceholder />) :
              <List sx={{ width: '100%', maxWidth: 720 }} className="w-full">
                {feedList.map((item, index) => (
                  <ListItem key={index} disablePadding className="mt-4">
                    <CommonFeedListItem data={item} />
                  </ListItem>
                ))}
              </List>}
          </Box>
          <Box display="flex" justifyContent="center">
            <Pagination className="place-self-center" count={10} page={page} color="primary" onChange={handlePaginationChange} />
          </Box>
        </div>
      }
    </div>
  )
}


export default CommonFeedList;
