import InteractionButton from './button'
import Cookie from '@/components/icons/cookie'
import More from '@/components/icons/more'
import Share from '@/components/icons/share'
import Suggestions from '@/components/icons/suggestion'
import ReportButton from './report-button'
import { ForumInteractionCounter } from '@/types'
import UpIcon from '@/components/icons/up-icon'

type Props = {
  handleOpenMore(): void;
  isMoreOpen: boolean;
  onClick(e: string): void
  counters: ForumInteractionCounter
  liked: boolean
}

const Interaction = (props: Props) => {
  const {handleOpenMore, isMoreOpen, onClick, counters, liked} = props;

  if(!counters) return;

  return (
    <div className='flex flex-row gap-4 w-full justify-end relative'>
      <InteractionButton liked={liked} onClick={() => onClick('cookie')}>
        <Cookie />
        <UpIcon />
        </InteractionButton>
      <InteractionButton onClick={() => onClick('comments')} count={counters.comment_count}>
        <Suggestions />
      </InteractionButton>
      <InteractionButton onClick={() => onClick('share')} count={counters.share_count}>
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