
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Routes for future pages */}
          <Route path="/services/*" element={<NotFound />} />
          <Route path="/work" element={<NotFound />} />
          <Route path="/work/:projectId" element={<NotFound />} />
          <Route path="/blog" element={<NotFound />} />
          <Route path="/blog/:postId" element={<NotFound />} />
          <Route path="/resources" element={<NotFound />} />
          <Route path="/resources/:resourceId" element={<NotFound />} />
          <Route path="/team" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
