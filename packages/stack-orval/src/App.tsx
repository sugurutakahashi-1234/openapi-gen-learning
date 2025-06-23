import { useEffect, useState } from "react";
import { PostsUI } from "./components/PostsUI";
import { setMockMode } from "./mocks/browser";

function App() {
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV) {
      setMockMode(showDemo);
    }
  }, [showDemo]);

  return (
    <PostsUI
      isMockMode={showDemo}
      onToggleMode={() => setShowDemo(!showDemo)}
    />
  );
}

export default App;
