// import { useQuery } from '@tanstack/react-query';
// import { peerApi } from '../../api/peer.api';
// import { PeersStats } from '../types';

// export const usePeersStats = () => {
//   const placeholderStats: PeersStats[] = [
//     {
//       userId: 0,
//       active: 0,
//       disabled: 0,
//       total: 0,
//     },
//   ];
//   const query = useQuery({
//     queryKey: ['peers-stats'],
//     queryFn: () => peerApi.getPeerCounts(),
//     retry: 2,
//     staleTime: 5 * 60 * 1000, // 5 минут
//     placeholderData: placeholderStats,
//   });

//   return {
//     ...query,
//     peerStats: query.data ?? [],
//   };
// };
