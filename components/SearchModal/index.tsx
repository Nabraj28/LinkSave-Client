import useSearchStore from "@/data/store/useSearchStore";
import {FlatList, Modal, Text, TextInput, View} from "react-native";
import searchModalStyles from "./searchModalStyles";
import useDebounce from "@/data/hooks/Search/useDounce";
import useGetUserData from "@/data/hooks/User/useGetUserData";
import useSearchLink from "@/data/hooks/Search/useSearchLink";
import { Link } from "@/data/types";
import LinkCard from "../LinkCard";


const SearchModal = ()=>{

    const styles = searchModalStyles();

    const {modalSearch, toggleModalSearch, searchTerm, setSearchTerm} = useSearchStore();
    const debouncedTerm = useDebounce({ value: searchTerm, delay: 500 });

    const {data: userData} = useGetUserData();
    const {data: searchData} = useSearchLink({
        userId: userData?.user._id,
        searchQuery: debouncedTerm
    });

    const handleCloseModal =()=>{
        toggleModalSearch();
        setSearchTerm('');
    };

    const links = searchData?.data || [];

    const getCategoryName=(item: Link)=>{
        const realCategory = userData?.user.categories.find(category =>
                category.links.some(catLink => catLink._id === item._id)
            );
            return realCategory?.name || 'Unknown';
    }

    const renderItem = ({ item }: { item: Link }) => (
        <LinkCard getCategoryName={getCategoryName} item={item} />
    );
    

    return(
        <Modal animationType="slide" visible={modalSearch} onRequestClose={handleCloseModal}>
            <View style={styles.searchContainer}>
            <View style={styles.container}>
                <TextInput 
            style={styles.searchInput} 
            placeholder="Search links"
            onChangeText={setSearchTerm}
            autoFocus
            />
            </View>
            <FlatList
            data={links}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={
                        <Text style={styles.emptyText}>
                            {searchTerm ? "No results found" : "Start typing to search"}
                        </Text>
                    }
            style={styles.queryDataContainer}
            />
            </View>
        </Modal>
    )
};

export default SearchModal;