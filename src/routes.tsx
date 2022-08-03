import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/home';
import { CreateRoom } from './pages/create-room';
import { PokerRoom } from './pages/poker-room';
import { EnterRoom } from './pages/enter-room'

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-room" element={<CreateRoom />} />
      <Route path="/poker-room" element={<PokerRoom />} />
      <Route path="/enter-room" element={<EnterRoom />} />
    </Routes>
  );
}
