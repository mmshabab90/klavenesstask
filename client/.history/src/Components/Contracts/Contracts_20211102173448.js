import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setData } from "../../features/userSlice";

export default function Contracts() {
  const searchInput = useSelector(selectSearchInput);
  const apiContractsUrl = "http://localhost:1337/contracts";
  const dispatch = useDispatch();
  const [contracts, setContracts] = React.useState([]);
  const [locading, setLoading] = React.useState(false);

  React.useEffect(() => {
    axios.get(apiContractsUrl).then((res) => {
      dispatch(setData(res.data));
      setContracts(res.data);
      setLoading(false);
    });
  }, [searchInput]);
  return (
    <div>
      <h1>Contracts Dashboard</h1>
    </div>
  );
}
