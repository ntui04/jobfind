import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter from expo-router
import styles from './nearbyjobs.style';
import { COLORS } from '../../../constants';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import useFetch from '../../../hook/usefetch';

const Nearbyjobs = () => {
  // Use useRouter from expo-router
  const router = useRouter();
 
  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "react developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
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
        ) : !data || data.length === 0 ? (
          <Text>No jobs available</Text>
        ) : (
          data.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job?.job_id || Math.random().toString()}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
}

export default Nearbyjobs;