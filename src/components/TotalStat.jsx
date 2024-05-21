import React from 'react'
import { FaPersonHarassing } from 'react-icons/fa6'
import { IoMusicalNote } from 'react-icons/io5'
import { GenIcon } from 'react-icons/lib'
import { MdAlbum } from 'react-icons/md'
import { DashboardCard } from '../page/dashboard/DashboardHome'
import { MusicVideo } from '@mui/icons-material'

export default function TotalStat({stat}) {
  return (
    <div className="">
    {/* <TitleHeader title={'All Statistics'}/> */}
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 lg:gap-10 gap-5  items-center justify-between ml-10 flex-wrap">
  
      <DashboardCard
        name={"Songs"}
        count={stat.totalSongs
          }
        icon={<IoMusicalNote color="white" size={25} />}
      />
      <DashboardCard
        name={"Albums"}
        count={stat.totalAlbums
        }
        icon={<MdAlbum color="white" size={25} />}
      />
      <DashboardCard
        name={"Artists"}
        count={stat.totalArtists}
        icon={<FaPersonHarassing color="white" size={25} />}
      />
      <DashboardCard
        name={"Gener"}
        count={stat.totalGenres}
        icon={<MusicVideo color="white" size={25} />}
      />
    

 
    </div>
   
    
  </div>
  )
}

