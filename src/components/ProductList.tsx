
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import useFetchProducts from "../hooks/useFetchProduct";
import CategorySidebar from "./CategorySideBar";

const ProductList: React.FC = () => {
  const { data: products, loading, error } = useFetchProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const uniqueCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <CategorySidebar
        categories={uniqueCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

    
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }} // Placeholder image, replace with actual product image URLs
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productCategory}>
                Category: {item.category}
              </Text>
              <Text style={styles.productStock}>
                Status: {item.inStock ? "In Stock" : "Out of Stock"}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  productList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productCard: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    maxWidth: Dimensions.get("window").width / 2 - 30,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  productCategory: {
    fontSize: 12,
    color: "#777",
    marginBottom: 5,
  },
  productStock: {
    fontSize: 12,
    color: "#2ecc71",
  },
});

export default ProductList;
