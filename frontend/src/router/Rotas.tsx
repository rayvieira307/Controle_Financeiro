import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Transacoes from "../pages/Transacoes";

export default function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transacoes" element={<Transacoes />} />
      </Routes>
    </BrowserRouter>
  );
}
