import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MapComponent from "./Map.tsx";
import "./App.css";
import { Input } from "./components/ui/input.tsx";
import LocationCard from "./components/ui/LocationCard.tsx";
import { locations } from "./data/locations.ts";

function App() {
  return (
    <div className="relative">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-semibold">Sabori</h2>
          </SidebarHeader>
          <SidebarContent>
            {locations.map((location) => (
              <LocationCard
                key={location.name}
                name={location.name}
                description={location.description}
                imageUrl={location.imageUrl}
              />
            ))}
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="absolute top-2 left-2 z-10">
            <SidebarTrigger />
          </div>
          <MapComponent />
        </SidebarInset>
      </SidebarProvider>
      <div className="absolute top-4 right-8 z-20 w-96">
        <Input
          placeholder="Search..."
          className="bg-white rounded-full h-12 px-6 text-base"
        />
      </div>
    </div>
  );
}

export default App;
