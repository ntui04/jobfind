import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/usefetch';

const Popularjobs = () => {
  const router = useRoute();
  const [selectedJob, setSelectedJob] = useState();

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "React developer",
    num_pages: 1,
  });

  const handleCardPress = (item) => {
    setSelectedJob(item.job_id);
    // Add navigation logic here if needed
  };

  useEffect(() => {
    // Log error and data for debugging
    if (error) {
      console.log("Error in PopularJobs:", error);
    }
    if (data) {
      console.log("Data received:", data.length > 0 ? "Has data" : "Empty data array");
    }
  }, [data, error]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <View>
            <Text>Something went wrong: {error}</Text>
            <TouchableOpacity style={{marginTop: 10}} onPress={refetch}>
              <Text style={{color: COLORS.primary}}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : data?.length === 0 ? (
          <Text>No jobs available</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id?.toString() || Math.random().toString()}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
}

export default Popularjobs;