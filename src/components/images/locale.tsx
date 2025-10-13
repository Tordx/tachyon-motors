
import React from 'react'
import PHFlagIcon from '../icons/ph-flag';
import InfoIcon from '../icons/info';

const Locale = () => {
    const [tooltipVisible, setTooltipVisible] = React.useState(false);

  return (
    <div onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)} draggable={false} className='flex items-center justify-center cursor-pointer'>
          <PHFlagIcon />
          <span className='ml-2 font-montserrat font-bold text-sm'>PH</span>
          {tooltipVisible && (
            <div className='absolute top-15 right-5 flex gap-2 px-4 py-2 justify-center items-center transform bg-black rounded-md'>
              <InfoIcon />
            <span className=' text-left text-xs font-montserrat font-bold'>Our motorcycles are currently only available in the Philippines but other products can be shipped worldwide
            </span>
            </div>
          )}
        </div>
  )
}

export default Locale;