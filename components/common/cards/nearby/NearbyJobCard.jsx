import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./nearbyjobcard.style";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const defaultLogo = "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";
  
  const checkImageURL = (url) => {
    if (!url) return false;
    return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{ 
            uri: checkImageURL(job?.employer_logo) 
              ? job.employer_logo 
              : defaultLogo 
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
     
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title || "Job Title"}
        </Text>
        <Text style={styles.jobType}>
          {job?.job_employment_type || "Employment Type"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;