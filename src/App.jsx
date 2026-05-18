import { BrowserRouter } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { useDemoFlow } from './store/demoFlow'
import { LockScreen } from './screens/LockScreen'
import { DeliveryBoard } from './screens/DeliveryBoard'
import { StaffView } from './screens/StaffView'
import { BoardResolved } from './screens/BoardResolved'

function DemoRouter() {
  const { currentState } = useDemoFlow()

  const screens = {
    LOCK_SCREEN:          <LockScreen />,
    ISSUE_DETAIL_COMP:    <LockScreen />,  // placeholder — replaced in Task 12
    BOARD:                <DeliveryBoard />,
    ISSUE_DETAIL_CABANA:  <LockScreen />,  // placeholder — replaced in Task 12
    STAFF_VIEW:           <StaffView />,
    STAFF_COMPLETE:       <StaffView />,
    BOARD_RESOLVED:       <BoardResolved />,
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
