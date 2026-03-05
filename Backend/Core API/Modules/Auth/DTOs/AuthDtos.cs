namespace Agromind_Core_API.Modules.Auth.DTOs;

public record RegisterDto(
    string FirstName,
    string LastName,
    string Email,
    string Password
);

public record LoginDto(
    string Email,
    string Password
);

public record AuthResponseDto(
    string Token,
    DateTime Expiration
);
