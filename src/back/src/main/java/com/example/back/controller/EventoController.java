@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*") // Essencial para o front falar com o back
public class EventoController {

    @Autowired
    private EventoRepository repository;

    @GetMapping
    public List<Evento> listarTodos() {
        return repository.findAll();
    }

    @PutMapping("/{id}/status")
    public Evento atualizarStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Evento evento = repository.findById(id).orElseThrow();
        evento.setStatus(body.get("status"));
        return repository.save(evento);
    }
}