import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./popularjobcard.style";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  // Default image URL if employer_logo is missing or invalid
  const defaultLogo = "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";
  
  // Check if image URL is valid
  const checkImageURL = (url) => {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{ 
            uri: checkImageURL(item.employer_logo) 
              ? item.employer_logo 
              : defaultLogo 
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name || "Company Name"}
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title || "Job Title"}
        </Text>

        <Text style={styles.location}>
          {item.job_country || "Location"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;