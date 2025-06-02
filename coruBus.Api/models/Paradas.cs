namespace corubus.api.Models;

public class ParadaCount
{
    public int Id { get; set; }
    public int Count { get; set; }
}

public class ParadasCounter
{
    public List<ParadaCount> Paradas { get; set; } = new();
}