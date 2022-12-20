import { useAppNavigation } from '../hooks/useNavigation';
import { trpc } from '../utils/trpc';

export function MySnailsStats() {
    const { data, isLoading, error } = trpc.snail.fetchAnalytics.useQuery();
    const { navigateTo } = useAppNavigation();

    if (error) {
        return <>error: {error.message}</>;
    }

    return (
        <div className="m-auto">
            <div className="stats stats-vertical border-2 border-black text-primary-content shadow md:stats-horizontal">
                <div className="stat">
                    <div className="stat-title">total clicks</div>
                    <div className="stat-value">
                        {isLoading ? '...' : data?.totalClicks}
                    </div>
                    <div className="stat-desc">all time</div>
                </div>

                <div className="stat">
                    <div className="stat-title">total snails</div>
                    <div className="stat-value">
                        {isLoading ? '...' : data?.totalSnails}
                    </div>
                    <div className="stat-actions">
                        <button
                            className="btn-sm btn"
                            onClick={navigateTo.homepage}
                        >
                            create new
                        </button>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">visitors</div>
                    <div className="stat-value">
                        {isLoading ? '...' : data?.totalVisitors}
                    </div>
                </div>
            </div>
        </div>
    );
}
