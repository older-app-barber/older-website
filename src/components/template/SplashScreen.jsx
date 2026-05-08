import { Progress } from "components/ui";
import logoBlack from "../../assets/logos/logo_black.png";
import logoWhite from "../../assets/logos/logo_white.png";

export function SplashScreen() {
    return (
        <div className="fixed grid h-full w-full place-content-center">
            <img src={logoBlack} alt="Logo Black" className="size-60 block dark:hidden" />
            <img src={logoWhite} alt="Logo White" className="size-60 hidden dark:block" />

            <Progress
                color="primary"
                isIndeterminate
                animationDuration="1s"
                className="mt-2 h-1"
            />
        </div>
    );
}
