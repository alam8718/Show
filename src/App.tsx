import {PageHeader} from "./layouts/PageHeader";
import CategoryPills from "./components/CategoryPills";
import {categories, videos} from "./data/HomeData";
import {useState} from "react";
import VideoGridItem from "./components/VideoGridItem";
import {SideBar} from "./layouts/SideBar";
import {SidebarProvider} from "./contexts/SidebarContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          {/* sidebar */}
          <SideBar />
          {/*  */}
          <div className="overflow-x-hidden px-8 pb-4">
            {/* category pills part */}
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            {/*  */}
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
              {videos.map((video, index) => (
                <VideoGridItem key={index + 1} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
