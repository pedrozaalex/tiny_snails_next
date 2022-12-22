import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useAppNavigation } from '../hooks/useNavigation';
import { trpc } from '../utils/trpc';

export function SnailsAnalytics() {
    const { data, isLoading, error } = trpc.snail.fetchAnalyticsData.useQuery();
    const { navigateTo } = useAppNavigation();

    if (error) {
        return <>error: {error.message}</>;
    }

    return (
        <div className="m-auto flex w-full flex-col rounded-lg border-2 border-black bg-base-100">
            <div className="stats stats-vertical text-primary-content sm:stats-horizontal">
                <div className="stat">
                    <div className="stat-title">total clicks</div>
                    <div className="stat-value">{isLoading ? '...' : data?.totalClicks}</div>
                    <div className="stat-desc">all time</div>
                </div>

                <div className="stat">
                    <div className="stat-title">total snails</div>
                    <div className="stat-value">{isLoading ? '...' : data?.totalSnails}</div>
                    <div className="stat-actions">
                        <button className="btn-sm btn" onClick={navigateTo.homepage}>
                            create new
                        </button>
                    </div>
                </div>

                <div className="stat">
                    <div className="stat-title">visitors</div>
                    <div className="stat-value">{isLoading ? '...' : data?.totalVisitors}</div>
                </div>
            </div>

            {data && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.clicksPerDay} margin={{ top: 20, right: 60, left: 20, bottom: 20 }}>
                        <XAxis dataKey="day" tick={renderDayTick} />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="clicks" stroke={'hsl(var(--pf))'} strokeWidth={2} />
                        <YAxis fontSize={13} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

function renderDayTick(props: { x: number; y: number; payload: { value: string } }) {
    const { x, y, payload } = props;

    const date = new Date(payload.value);

    return (
        <g transform={`translate(${x},${y})`}>
            <text fontSize={13} x={0} y={0} dy={16} dx={16} textAnchor="end" fill="#666">
                {date.getMonth() + 1}/{date.getDate()}
            </text>
        </g>
    );
}
