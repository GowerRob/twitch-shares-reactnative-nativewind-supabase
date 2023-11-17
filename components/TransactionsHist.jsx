import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/User";
import {fetchAllTransactions} from "../Utils";
import Transactions from "./Transactions";
import DropDownPicker from "react-native-dropdown-picker";

const TransactionsHist = () => {
    const {user} = useContext(UserContext);
    const [allTransactions, setAllTransactions] = useState();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: "Apple", value: "apple"},
        {label: "Banana", value: "banana"},
    ]);

    useEffect(() => {
        fetchAllTransactions(user.id, 50).then((result) => {
            const newData = result.map((item) => {
                const newItem = {...item};
                newItem.date = new Date(item.transaction_date);
                newItem.game = newItem.games.game_name;

                return newItem;
            });
            const newItems = [];
            newData.forEach((item) => {
                if (!newItems.includes(item.game)) {
                    newItems.push({label: item.game, value: item.game});
                }
            });
            setItems(newItems);

            setAllTransactions(newData);
        });
    }, []);

    return (
        <>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

            {allTransactions && (
                <Transactions
                    data={{
                        transactions: allTransactions,
                    }}
                />
            )}
        </>
    );
};

export default TransactionsHist;
