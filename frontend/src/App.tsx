import NavDashboard from "./components/navigation/nav";
import { Routes, Route } from "react-router-dom";
import Classroom from "./screens/classroom/classroom";
import AppProvider from "./provider/appProvider";
import Student from "./screens/student/student";
function App() {
  return (
    <>
      <AppProvider>
        <NavDashboard />
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/classroom/:studentId" element={<Student />} />
        </Routes>
      </AppProvider>
    </>
  );
}

export default App;
