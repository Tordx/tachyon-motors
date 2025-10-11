import InteractionButton from './button'
import Cookie from '@/components/icons/cookie'
import More from '@/components/icons/more'
import Share from '@/components/icons/share'
import Suggestions from '@/components/icons/suggestion'
import ReportButton from './report-button'

type Props = {
  handleOpenMore(): void;
  isMoreOpen: boolean;
}

const Interaction = (props: Props) => {
  const {handleOpenMore, isMoreOpen} = props;
  return (
    <div className='flex flex-row gap-4 w-full justify-end relative'>
      <InteractionButton onClick={() => {alert('wtf')}} count={0}>
        <Cookie />
        </InteractionButton>
      <InteractionButton onClick={() => {}} count={0}>
        <Suggestions />
      </InteractionButton>
      <InteractionButton onClick={() => {}} count={0}>
        <Share />
      </InteractionButton>
      <InteractionButton onClick={handleOpenMore} className='ring-0 gap-0 hidden md:flex'>
        <More />
      </InteractionButton>
      {isMoreOpen && <div className='absolute top-10 bg-black p-4 rounded-md hidden md:flex'>
        <ReportButton onClick={() => {}} />
      </div>}
    </div>
  )
}

export default Interaction