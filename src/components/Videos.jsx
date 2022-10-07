import { Stack } from '@mui/system'
import React from 'react'
import ChannelCard from './ChannelCard'
import VideoCard from './VideoCard'

const Videos = ({ videos ,direction}) => {


  return (
    <Stack
      direction={direction || "row"} flexWrap="wrap"
      justifyContent="center" gap={2}

    >
      {
        videos.map((item, index) => (

          <div key={index}>


            {item.id.videoId && <VideoCard video={item} />}

            {item.id.channelId && <ChannelCard channelDetail={item} />}

          </div>
        )


        )
      }
    </Stack>
  )
}

export default Videos
