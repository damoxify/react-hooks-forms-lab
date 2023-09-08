import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [itemList, setItemList] = useState(items); // The state to hold the list of items

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(newText) {
    setSearchText(newText);
  }

  function handleItemFormSubmit(newItem) {
    // To add new item to the list by updating state
    setItemList([...itemList, newItem]);
  }

  // To filter items by category and search text
  const itemsToDisplay = itemList.filter((item) => {
    if (selectedCategory === "All" && !searchText) return true;

    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;

    const nameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());

    return categoryMatch && nameMatch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
