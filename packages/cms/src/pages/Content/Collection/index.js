import List from "./List";
import { ListProvider } from "context/list";

const Index = () => (
  <ListProvider>
    <List />
  </ListProvider>
);

export default Index;
