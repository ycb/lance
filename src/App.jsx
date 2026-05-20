import { BrowserRouter } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from 'sonner'
import { PhoneFrame } from './components/PhoneFrame'
import { useDemoFlow } from '@/store/demoFlow'
import { LockScreen } from './screens/LockScreen'
import { DeliveryBoard } from './screens/DeliveryBoard'
import { IssueDetail } from './screens/IssueDetail'
import { StaffView } from './screens/StaffView'
import { BoardResolved } from './screens/BoardResolved'

function DemoRouter() {
  const { currentState } = useDemoFlow()

  const screens = {
    LOCK_SCREEN:          <LockScreen />,
    ISSUE_DETAIL_COMP:    <IssueDetail />,
    BOARD:                <DeliveryBoard />,
    ISSUE_DETAIL_CABANA:  <IssueDetail />,
    STAFF_VIEW:           <StaffView />,
    STAFF_COMPLETE:       <StaffView />,
    BOARD_RESOLVED:       <BoardResolved />,
  }

  return screens[currentState] ?? <LockScreen />
}

function PhoneToaster() {
  const [container, setContainer] = useState(null)
  useEffect(() => { setContainer(document.getElementById('phone-portal')) }, [])
  if (!container) return null
  return <Toaster position="bottom-center" container={container} />
}

export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <DemoRouter />
      </PhoneFrame>
      <PhoneToaster />
    </BrowserRouter>
  )
}
