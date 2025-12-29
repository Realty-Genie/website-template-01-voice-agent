import { useEffect } from 'react';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  useEffect(() => {
    onStartCall()
  }, [])
  return (
    <div ref={ref} className='h-screen overflow-hidden'>
    </div>
  );
};
