import { useQuery } from '@tanstack/react-query';
import { offerService } from '../services/offer.service';

export const useOffers = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['offers'],
        queryFn: () => offerService.getOffers(),
        enabled
    });
};
