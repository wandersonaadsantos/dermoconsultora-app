import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./shell/AppShell";
import { CompareProvider } from "./state/CompareProvider";
import { DataProvider } from "./state/DataProvider";
import { FavoritesProvider } from "./state/FavoritesProvider";
import { Compare } from "../screens/Compare";
import { Consult } from "../screens/Consult";
import { Home } from "../screens/Home";
import { Attend } from "../screens/Attend";
import { CourseModule } from "../screens/CourseModule";
import { Exercises } from "../screens/Exercises";
import { ExerciseDetail } from "../screens/ExerciseDetail";
import { ProductDetail } from "../screens/ProductDetail";
import { SafetyChecklist } from "../screens/SafetyChecklist";
import { Simulations } from "../screens/Simulations";
import { SimulationDetail } from "../screens/SimulationDetail";
import { Study } from "../screens/Study";

export function AppRoutes() {
  return (
    <HashRouter>
      <DataProvider>
        <FavoritesProvider>
          <CompareProvider>
            <Routes>
              <Route element={<AppShell />}>
                <Route path="/" element={<Home />} />
                <Route path="/study" element={<Study />} />
                <Route path="/study/:moduleId" element={<CourseModule />} />
                <Route path="/consult" element={<Consult />} />
                <Route path="/attend" element={<Attend />} />
                <Route path="/simulations" element={<Simulations />} />
                <Route path="/simulations/:simulationId" element={<SimulationDetail />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/exercises/:exerciseId" element={<ExerciseDetail />} />
                <Route path="/product/:routeId" element={<ProductDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/safety" element={<SafetyChecklist />} />
              </Route>
            </Routes>
          </CompareProvider>
        </FavoritesProvider>
      </DataProvider>
    </HashRouter>
  );
}
