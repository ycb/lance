import { BrowserRouter } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { useDemoFlow } from './store/demoFlow'
import { LockScreen } from './screens/LockScreen'
import { DeliveryBoard } from './screens/DeliveryBoard'
import { TriageComp } from './screens/TriageComp'
import { CabanaThread } from './screens/CabanaThread'
import { StaffView } from './screens/StaffView'
import { BoardResolved } from './screens/BoardResolved'

function DemoRouter() {
  const { currentState } = useDemoFlow()

  const screens = {
    LOCK_SCREEN:         <LockScreen />,
    BOARD_INITIAL:       <DeliveryBoard variant="initial" />,
    TRIAGE_COMP:         <TriageComp />,
    BOARD_COMP_RESOLVED: <DeliveryBoard variant="comp_resolved" />,
    CABANA_THREAD:       <CabanaThread />,
    STAFF_VIEW:          <StaffView variant="idle" />,
    STAFF_COMPLETE:      <StaffView variant="complete" />,
    BOARD_RESOLVED:      <BoardResolved />,
  }

  return screens[currentState] ?? <LockScreen />
}

export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <DemoRouter />
      </PhoneFrame>
    </BrowserRouter>
  )
}
