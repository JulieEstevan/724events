import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Ajout afin de stocker l'event le plus recent
  const [last, setLast] = useState(null);

// Ajout afin de surveiller et trier data pour definir last selon l'event le plus recent 
useEffect(() => {
  if (data && data.events) {
    const sortedEvents = data.events.sort((a, b) => new Date(b.date) - new Date(a.date))
    setLast(sortedEvents[0])
  }
}, [data])

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });
  
const providerValue = useMemo(() => ({
  data, error, last
}), [data, error, last])

  return (
    <DataContext.Provider value={providerValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
