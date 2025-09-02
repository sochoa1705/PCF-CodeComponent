import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchApiData } from './apiService';

interface ApiConsumerProps {
    apiUrl?: string; 
}

interface Post  {
    userId: number;
    id: number;
    title: string;
    body: string;
}


const ConsumerComponent: React.FC<ApiConsumerProps> = ({ apiUrl }) => {
    const [data, setData] = React.useState<Post|null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchApiData<Post>(apiUrl); 
                setData(result);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [apiUrl]);

    return (
        <div className="container mt-3">
            <h3 className="text-primary">Datos del API</h3>
            {loading && <div className="alert alert-info">Cargando...</div>}
            {error && <div className="alert alert-danger">Error: {error}</div>}
            {data && (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <p className="card-text">{data.body}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsumerComponent;