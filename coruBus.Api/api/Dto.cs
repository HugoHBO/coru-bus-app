namespace Corubus.Api.Dtos
{
    public class ParadaDTO
    {
        public int Id { get; set; }
        public int Count { get; set; }
    }

    public class ParadaIdDTO
    {
        public int Id { get; set; }
        public int Count { get; set;}
    }

    public class ParadasRequest
    {
        public List<ParadaDTO> Paradas { get; set; } = new();
    }
}