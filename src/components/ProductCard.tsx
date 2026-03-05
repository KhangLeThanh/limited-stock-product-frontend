import type { Product } from "../utils/types";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

type Props = {
  product: Product;
  onReserve: (id: string) => void;
  loading: boolean;
};

export default function ProductCard({ product, onReserve, loading }: Props) {
  return (
    <Card sx={{ width: 250, m: 1 }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>Stock: {product.stock}</Typography>
        {product.stock === 0 && <Typography color="error">Sold Out</Typography>}
      </CardContent>
      {product.stock !== 0 && (
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={() => onReserve(product.id)}
          >
            {loading ? "Reserving..." : "Reserve"}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
