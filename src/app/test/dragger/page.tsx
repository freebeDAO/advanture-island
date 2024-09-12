import DraggerComponent from "src/components/draggerComponent/DraggerComponent";
import {Avatar, AvatarImage} from "src/components/ui/avatar";

export default function Page() {
    return <div>
        <DraggerComponent containerStyle={'w-[800px] h-[500px] m-auto bg-sky-300'}>
            <Avatar>
                <AvatarImage src="/assets/logo.png"></AvatarImage>
            </Avatar>
        </DraggerComponent>
    </div>
}
