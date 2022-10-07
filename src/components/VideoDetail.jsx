import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgress, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import Videos from './Videos'

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null)
  const [relatedVideo, setRelatedVideo] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))

    fetchFromAPI(`search?part=snippet&type=video&relatedToVideoId=${id}`)
      .then((data) => {
      
        setRelatedVideo(data.items)})


  }, [id])
 

  if (!videoDetail?.snippet || !relatedVideo ) return (<Box
    minHeight="95vh"
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>

    <CircularProgress />
  </Box>)


  const { snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount } } = videoDetail;

  return (
    <Box minHeight="95vh">
    <Stack direction={{ xs: "column", md: "row" }} 
   px={4}
  
    >
      <Box flex={1}>
        <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
          <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
            {title}
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2} >
            <Link to={`/channel/${channelId}`}>
              <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="#fff" >
                {channelTitle}
                <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
              </Typography>
            </Link>
            <Stack direction="row" gap="20px" alignItems="center">
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                {parseInt(viewCount).toLocaleString()} views
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                {parseInt(likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
        <Videos videos={relatedVideo} direction="column" />
      </Box>
    </Stack>
  </Box>
  )
}

export default VideoDetail
