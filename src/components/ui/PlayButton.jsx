import Button from "@mui/material/Button";
import Play from "@mui/icons-material/PlayArrow";

export function PlayButton({ buttonText }) {
     return (
          <Button variant="outline" size="lg" className="text-lg px-8 py-4">
               <Play className="mr-2 h-5 w-5" />
               {buttonText}
          </Button>
     );
};