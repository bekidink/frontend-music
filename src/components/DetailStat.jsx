import React from 'react'
import StatCard from './card/StatCard'

export default function DetailStat({stat}) {
  return (
    <div className="mt-3 w-full grid grid-cols-1 lg:grid-cols-4 lg:gap-10 gap-5  items-center justify-evenly flex-wrap">
       {stat && stat.map((item,i)=>(
      <StatCard name={item._id} count={item.count} />
     ))}
       </div>
  )
}
