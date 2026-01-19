import { observer } from 'mobx-react-lite';
import { stageJobModel } from '../../features/service-stage/models/job-model';
import Loader from '@/packages/shared-ui/loader/loader';
import { useEffect } from 'react';
import { useAuth } from '@/packages/entities/user/context';
import { StageCard } from '@/packages/shared-components/stage-card';

export const Stages = observer(() => {

    const { model, isLoaded, init } = stageJobModel;
    const { user } = useAuth();

    useEffect(() => {
        init(6);
    }, [])

    return (
        <div className="informations-dispatch__requestregistry">
            <div className="informations-dispatch__requestregistry requestregistry-dispatch bg-white rounded-2xl p-7 mb-8" >
                {isLoaded ? <Loader /> : model.map((stage, key) => (<StageCard stage={stage} />))}
            </div>
        </div>
    )
})