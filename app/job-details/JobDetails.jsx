import React, { useState } from "react";
import { View, Text, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hook/usefetch";
import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";

const JobDetails = () => {
    // Use useLocalSearchParams instead of useSearchParams
    const params = useLocalSearchParams();
    const router = useRouter();
    
    // Added useState import and initialization
    const [refreshing, setRefreshing] = useState(false);
    
    // Get job ID from the route parameters
    const { id } = params;
    
    // Fetch job details using the job ID
    const { data, isLoading, error, refetch } = useFetch("job-details", {
        job_id: id
    });
    
    const jobDetails = data?.[0] || {};
    
    // Refresh function
    const onRefresh = () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    };

    return (
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left} 
                            dimension="60%" 
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.share} 
                            dimension="60%"
                        />
                    ),
                    headerTitle: " "
                }}
            />
            
            <>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <View style={{padding: SIZES.medium, alignItems: "center"}}>
                            <Text>Something went wrong</Text>
                            <TouchableOpacity onPress={refetch}>
                                <Text style={{color: COLORS.primary, marginTop: SIZES.small}}>Try again</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{padding: SIZES.medium}}>
                            {/* Job details content here */}
                            <Company 
                                companyLogo={jobDetails.employer_logo}
                                jobTitle={jobDetails.job_title}
                                companyName={jobDetails.employer_name}
                                location={jobDetails.job_country}
                            />
                            
                            <JobTabs />
                            
                            
                            {/* Add more job detail components here */}
                        </View>
                    )}
                </ScrollView>
                
                {/* Footer */}
                {!isLoading && !error && (
                    <JobFooter url={jobDetails?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
                )}
            </>
        </SafeAreaView>
    );
}

export default JobDetails;