import { useQuery } from '@apollo/client';
import { Button, Skeleton, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomArrowButton from 'src/components/CustomArrowButton';
import { GLOBAL_SEARCH } from 'src/graphql/queries';
import { useRouter } from 'src/routes/hooks';
import { GlobalSearchResponse, SearchNode } from 'src/types/graphql/types/common.types';

const SearchSection = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const { data, loading, error } = useQuery<GlobalSearchResponse>(GLOBAL_SEARCH, {
        variables: { search },
        skip: !search,
    });

    const skeletonArray = Array.from({ length: 3 });


    return (
        <Stack gap={8}>
            <Stack sx={{ maxWidth: '800px' }} gap={4}>
                <Typography variant="h1" fontWeight={600} sx={{ textTransform: "capitalize !important" }}>
                    Your Search Results
                </Typography>
                <TextField
                    fullWidth
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                />
            </Stack>

            {loading && (
                <Stack gap={4}>
                    {skeletonArray.map((_, i) => (
                        <Stack key={i} gap={1}>
                            <Skeleton variant="text" width={120} height={40} />
                            <Stack gap={3}>
                                {skeletonArray.map((_, j) => (
                                    <Stack
                                        key={j}
                                        sx={{
                                            border: '1px solid rgba(109, 110, 113, 0.5)',
                                            borderRadius: '8px',
                                            padding: 3,
                                        }}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        gap={3}
                                    >
                                        <Skeleton variant="text" width="80%" height={30} />
                                        <Skeleton variant="rectangular" width={150} height={50} />
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            )}

            {error && <Typography>Error loading results.</Typography>}

            {!search && (
                <Typography variant="body1" mt={2}>
                    Start typing to see results.
                </Typography>
            )}

            {data && (
                <Stack gap={4}>
                    {Object.entries(data)
                        .filter(([_, val]) => val.nodes.length > 0)
                        .map(([key, val]) => (
                            <Stack key={key} gap={1}>
                                <Typography variant="h2" fontWeight={600} sx={{ textTransform: "capitalize !important" }}>
                                    {key}
                                </Typography>
                                <Stack gap={3}>

                                    {val.nodes.map((item: SearchNode) => (
                                        <Stack key={item.id} sx={{
                                            border: "1px solid rgba(109, 110, 113, 0.5)",
                                            borderRadius: "8px",
                                            padding: 3
                                        }} direction={{xs:"column",md:"row"}} justifyContent={{xs:"flex-start",md:"space-between"}} alignItems={"center"} gap={3}>
                                            <Typography variant="h4" sx={{ fontWeight: "700 !important" }} width={{xs:"100%",md:"80%"}}>{item.title}</Typography>
                                            <CustomArrowButton name="Read More" onClick={() => router.push(item.uri)} sx={{ height: "50px", width: {xs:"100%",md:"150px"} }} />
                                        </Stack>
                                    ))}
                                </Stack>
                            </Stack>
                        ))}
                </Stack>
            )}
        </Stack>
    );
};

export default SearchSection;
