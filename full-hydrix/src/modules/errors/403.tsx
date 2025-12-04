import { Button } from "@/shared/ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Error404 = () => {

    const navigate = useNavigate();

    return (
        <div className="text-center pb-[10%]">
            <h1 className="text-[128px] text-[var(--clr-accent)] font-bold">403</h1>
            <p className="font-semibold text-[32px] mb-5">Доступ запрешён</p>
            <Button
                onClick={() => navigate(-1)}
                class="mx-auto px-6 py-2 bg-gray-500 text-white rounded-lg hover:opacity-50 transition duration-300"
            >
                Назад
            </Button>
        </div>
    );
}