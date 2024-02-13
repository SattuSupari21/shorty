import {features} from "@/app/constants";
import {Card} from "@radix-ui/themes";

type Feature = {
    id: number,
    heading: string,
    text: string,
}

export default function FeaturesComponent() {
    return (
        <div className="flex items-center justify-around">
            {features.map((feature: Feature) => {
                return <Card key={feature.id} size="2" style={{ maxWidth: 200, height:200}}>
                    <div className="w-full h-full flex flex-col justify-center">
                        <p className="text-xl font-bold text-center">{feature.heading}</p>
                        <p className="text-md text-center">{feature.text}</p>
                    </div>
                </Card>
            })}
        </div>
    )
}