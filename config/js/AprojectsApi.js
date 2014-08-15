function validar_vacios(valor)
{
    if(valor==null||valor.length==0||/^\s+$/.test(valor))
    {
        return false;
    }
    
    return true;
}
