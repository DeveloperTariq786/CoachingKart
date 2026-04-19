import { useInstitute } from '@/modules/institutes/institute/hooks/useInstitute';
import InstitutionResultsHeader from './InstitutionResultsHeader';
import InstitutionResultsBody from './InstitutionResultsBody';

const InstitutionResults: React.FC = () => {
    const { details } = useInstitute();

    return (
        <div className="w-full bg-slate-50 min-h-screen">
            <InstitutionResultsHeader institutionId={details?.id} />
            <InstitutionResultsBody institutionId={details?.id} />
        </div>
    );
};

export default InstitutionResults;
